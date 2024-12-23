import { Book } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="flex gap-5 border p-5 shadow-md rounded">
      <Image
        src={book.coverImage}
        alt={book.title}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "auto", height: "12rem" }}
      />

      <div>
        <h2 className="line-clamp-2 text-xl font-bold text-primary-600 text-balance">
          {book.title}
        </h2>
        <p className="font-bold text-primary-900 my-1">
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
