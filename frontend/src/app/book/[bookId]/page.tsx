import React from "react";
import Image from "next/image";
import { Book } from "@/types";
import DownloadButton from "./components/DownloadButton";

const SingleBookPage = async ({ params }: { params: { bookId: string } }) => {
  let book: Book | null = null;
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/books/${params.bookId}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error fetching book");
    }
    book = await response.json();
  } catch (err: any) {
    throw new Error("Error fetching book");
  }

  if (!book) {
    throw new Error("Book not found");
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10">
      <div className="lg:col-span-2 col-span-full lg:pr-16 pr-0 text-primary-950 text-center lg:text-start">
        <h2 className="mb-5 md:text-5xl text-2xl font-bold leading-[1.1]">
          {book.title}
        </h2>
        <span className="font-semibold">by {book.author.name}</span>
        <p className="mt-5 text-lg leading-8">{book.description}</p>
        <DownloadButton fileLink={book.file} />
      </div>
      <div className="justify-end lg:flex hidden">
        <Image
          src={book.coverImage}
          alt={book.title}
          className="rounded-md border"
          height={0}
          width={0}
          sizes="100vw"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default SingleBookPage;
