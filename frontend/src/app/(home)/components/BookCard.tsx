import { Book } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="flex flex-wrap  md:flex-nowrap gap-5 border p-5 shadow-md rounded">
      <Image
        className="mx-auto"
        src={book.coverImage}
        alt={book.title}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "auto", height: "12rem" }}
      />

      <div className="mx-auto my-auto md:mx-0 text-center md:text-start">
        <h2 className="line-clamp-2 md:text-xl text-[14px] font-bold text-primary-600 text-balance">
          {book.title}
        </h2>
        <p className="font-bold text-primary-900 my-1 md:text-[20px] text-[14px] ">
          Published by: {book.author.name}
        </p>

        <Link
          className="px-2 py-1 rounded border border-primary-500 text-primary-500 font-medium inline-block mt-4 text-sm hover:border-primary-100 hover:bg-primary-100 transition "
          href={`/book/${book._id}`}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
