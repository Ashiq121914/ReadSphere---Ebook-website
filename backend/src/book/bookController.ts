/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";

import createHttpError from "http-errors";
import bookModel from "./bookModel";

import { AuthRequest } from "../middlewares/authenticate";
import { v4 as uuidv4 } from "uuid";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, genre } = req.body;
  try {
    // cloudinary setup for image

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    // const coverImageMimeType = files?.coverImage[0]?.mimetype.split("/").at(-1);

    // const fileName = files.coverImage[0].filename;
    // const dataCoverImage = `data:${
    //   fileName.mimetype
    // };base64,${fileName.buffer.toString("base64")}`;

    // const filePath = path.resolve(
    //   __dirname,
    //   "../../public/data/uploads",
    //   fileName
    // );

    // const uploadResult = await cloudinary.uploader.upload(filePath, {
    //   filename_override: fileName,
    //   folder: "book-covers",
    //   format: coverImageMimeType,
    // });

    // // for pdf file
    // const bookFileName = files.file[0].filename;
    // const bookFilePath = path.resolve(
    //   __dirname,
    //   "../../public/data/uploads",
    //   bookFileName
    // );
    // const bookFileUploadResult = await cloudinary.uploader.upload(
    //   bookFilePath,
    //   {
    //     resource_type: "raw",
    //     filename_override: bookFileName,
    //     folder: "book-pdfs",
    //     format: "pdf",
    //   }
    // );

    const coverImage = files.coverImage[0];
    const bookFile = files.file[0];
    // Upload cover image to Cloudinary
    const dataCoverImage = `data:${
      coverImage.mimetype
    };base64,${coverImage.buffer.toString("base64")}`;
    const coverImagePublicId = uuidv4();
    const uploadCoverImage = await cloudinary.uploader.upload(dataCoverImage, {
      resource_type: "auto",
      public_id: coverImagePublicId,
      folder: "bookbreeze",
    });
    // Upload PDF file to Cloudinary using upload_stream
    const filePublicId = `${uuidv4()}.pdf`;
    const uploadFile = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            public_id: `${filePublicId}`,
            folder: "bookbreeze",
          },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) => {
            if (error) {
              return reject(error); // Reject if there's an error
            }
            if (result) {
              resolve(result); // Resolve with the result
            }
          }
        );
        stream.end(bookFile.buffer); // Send the file buffer
      }
    );

    const _req = req as AuthRequest;

    const newBook = await bookModel.create({
      title,
      description,
      genre,
      author: _req.userId,
      coverImage: uploadCoverImage.secure_url,
      file: uploadFile.secure_url,
    });

    // try {
    //   // delete temp files
    //   await fs.promises.unlink(filePath);
    //   await fs.promises.unlink(bookFilePath);
    // } catch (err) {
    //   return next(createHttpError(500, "error while deleting the temp files"));
    // }
    res.status(201).json({ id: newBook._id });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while uploading the files"));
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, genre } = req.body;
  const bookId = req.params.bookId;

  const book = await bookModel.findOne({ _id: bookId });

  if (!book) {
    return next(createHttpError(404, "book not found"));
  }

  // check access
  const _req = req as AuthRequest;
  if (book.author.toString() !== _req.userId) {
    return next(
      createHttpError(403, "Unauthorized, You can not update others book")
    );
  }

  // for image cloudinary update
  // check if image field is exists

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (files.coverImage) {
    // const filename = files.coverImage[0].filename;
    // const coverMimeType = files.coverImage[0].mimetype.split("/").at(-1);

    // //send files to cloudinary
    // const filePath = path.resolve(
    //   __dirname,
    //   "../../public/data/uploads",
    //   filename
    // );
    // completeCoverImage = filename;
    // const uploadResult = await cloudinary.uploader.upload(filePath, {
    //   filename_override: completeCoverImage,
    //   folder: "book-covers",
    //   format: coverMimeType,
    // });

    // completeCoverImage = uploadResult.secure_url;

    // try {
    //   // delete temp files
    //   await fs.promises.unlink(filePath);
    // } catch (err) {
    //   return next(
    //     createHttpError(
    //       500,
    //       "error while deleting the temp files while updating"
    //     )
    //   );
    // }
    // destroy old cover image
    // do this later
    //  await cloudinary.uploader.destroy(book.coverImage.public_id);
    const coverImage = files.coverImage[0];
    const dataCoverImage = `data:${
      coverImage.mimetype
    };base64,${coverImage.buffer.toString("base64")}`;
    const coverImagePublicId = `${uuidv4()}`;
    const uploadCoverImage = await cloudinary.uploader.upload(dataCoverImage, {
      resource_type: "auto",
      public_id: coverImagePublicId,
    });
    book.coverImage = uploadCoverImage.secure_url;
  }

  // for pdf cloudinary update
  // check if file field is exist

  if (files.file) {
    // const bookFileName = files.file[0].filename;
    // const bookFilePath = path.resolve(
    //   __dirname,
    //   "../../public/data/uploads/",
    //   bookFileName
    // );

    // completeFileName = bookFileName;

    // const uploadResultPdf = await cloudinary.uploader.upload(bookFilePath, {
    //   resource_type: "raw",
    //   filename_override: completeFileName,
    //   folder: "book-pdfs",
    //   format: "pdf",
    // });
    // completeFileName = uploadResultPdf.secure_url;

    // try {
    //   // delete temp files
    //   await fs.promises.unlink(bookFilePath);
    // } catch (err) {
    //   return next(
    //     createHttpError(
    //       500,
    //       "error while deleting the temp pdfs while updating"
    //     )
    //   );
    // }
    // destroy old file
    // do this later
    //  await cloudinary.uploader.destroy(book.file.public_id);
    const bookFile = files.file[0];
    const filePublicId = `${uuidv4()}.pdf`;
    const uploadFile = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            public_id: filePublicId,
          },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) => {
            if (error) {
              return reject(error);
            }
            if (result) {
              resolve(result);
            }
          }
        );
        stream.end(bookFile.buffer);
      }
    );
    book.file = uploadFile.secure_url;
  }

  // const updatedBook = await bookModel.findOneAndUpdate(
  //   {
  //     _id: bookId,
  //   },
  //   {
  //     title: title,
  //     description: description,
  //     genre: genre,
  //     coverImage: completeCoverImage ? completeCoverImage : book.coverImage,
  //     file: completeFileName ? completeFileName : book.file,
  //   },
  //   { new: true }
  // );
  // if title is updated
  if (title) {
    book.title = title;
  }

  // if description is updated
  if (description) {
    book.description = description;
  }
  // if genre is updated
  if (genre) {
    book.genre = genre;
  }
  await book.save();

  res.json({ message: "book updated" });
};

const listBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await bookModel.find().populate("author", "name");
    res.json(book);
  } catch (error: any) {
    return next(createHttpError(500, error.message));
  }
};

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.bookId;
  try {
    const book = await bookModel
      .findOne({ _id: bookId })
      .populate("author", "name");
    if (!book) {
      return next(createHttpError(404, "book not found"));
    }
    res.json(book);
  } catch (error: any) {
    return next(createHttpError(500, error.message));
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  const book = await bookModel.findOne({ _id: bookId });

  if (!book) {
    return next(createHttpError(404, "book not found"));
  }

  // check access
  const _req = req as AuthRequest;
  if (book.author.toString() !== _req.userId) {
    return next(
      createHttpError(403, "Unauthorized, You can not delete others book")
    );
  }

  // book-covers/mqaedky7nuey2xoevaop
  // https://res.cloudinary.com/dtdxjnfql/image/upload/v1734374488/book-covers/mqaedky7nuey2xoevaop.png

  const coverFileSplits = book.coverImage.split("/");
  const coverImagePublicId =
    coverFileSplits.at(-2) + "/" + coverFileSplits.at(-1)?.split(".").at(-2);

  const bookFileSplits = book.file.split("/");
  const bookfilePublicId = bookFileSplits.at(-2) + "/" + bookFileSplits.at(-1);

  try {
    await cloudinary.uploader.destroy(coverImagePublicId);
    await cloudinary.uploader.destroy(bookfilePublicId, {
      resource_type: "raw",
    });

    await bookModel.deleteOne({ _id: bookId });
  } catch (error: any) {
    return next(createHttpError(500, error.message));
  }
  res.status(204).json({ message: "deleting complete" });
};

export { createBook, updateBook, listBook, getSingleBook, deleteBook };
