"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  FiEye,
  FiThumbsUp,
  FiThumbsDown,
  FiMessageSquare,
  FiArrowRight,
} from "react-icons/fi";

const ForumPostCard = ({ post, user }) => {
  const likesCount = post?.likes?.length || 0;
  const dislikesCount = post?.dislikes?.length || 0;

  const isAdmin = post?.authorRole?.toLowerCase() === "admin";

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        group
        h-full
        overflow-hidden
        rounded-3xl
        border
        border-neutral-800
        bg-[#0b0b0b]
        transition-all
        duration-700
        hover:border-[#caf300]/40
        hover:shadow-[0_0_40px_rgba(202,243,0,0.12)]
      "
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="
            object-cover
            transition-all
            duration-1000
            md:group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`
              px-3 py-1
              rounded-full
              text-[10px]
              font-bold
              tracking-wider
              border
              backdrop-blur-md
              ${
                isAdmin
                  ? "bg-red-500/15 border-red-500/30 text-red-400"
                  : "bg-[#caf300]/15 border-[#caf300]/30 text-[#caf300]"
              }
            `}
          >
            {isAdmin ? "ADMIN" : "TRAINER"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex h-[320px] flex-col p-5">
        {/* TITLE */}
        <h3
          className="
            line-clamp-2
            text-xl
            font-black
            uppercase
            leading-tight
            text-white
            transition-colors
            duration-500
            group-hover:text-[#caf300]
          "
        >
          {post.title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className="
            mt-3
            line-clamp-3
            text-sm
            leading-relaxed
            text-neutral-400
          "
        >
          {post.description}
        </p>

        {/* AUTHOR */}
        <div className="mt-4 flex items-center gap-3">
          <Image
            src={post.authorImage}
            alt={post.authorName}
            width={36}
            height={36}
            className="
              rounded-full
              border
              border-neutral-700
            "
          />

          <div>
            <p className="text-sm font-medium text-white">{post.authorName}</p>

            <p className="text-xs text-neutral-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* PUSH EVERYTHING UP */}
        <div className="mt-auto">
          {/* STATS */}
          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-neutral-800
              bg-neutral-900/50
              p-3
            "
          >
            <div className="flex items-center gap-1 text-neutral-400">
              <FiEye size={15} />
              <span className="text-xs">{post.views || 0}</span>
            </div>

            <div className="flex items-center gap-1 text-[#caf300]">
              <FiThumbsUp size={15} />
              <span className="text-xs">{likesCount}</span>
            </div>

            <div className="flex items-center gap-1 text-red-400">
              <FiThumbsDown size={15} />
              <span className="text-xs">{dislikesCount}</span>
            </div>

            <div className="flex items-center gap-1 text-blue-400">
              <FiMessageSquare size={15} />
              <span className="text-xs">{post.commentsCount || 0}</span>
            </div>
          </div>

          {/* BUTTON */}
          <Link href={`/forum/${post._id}`}>
            <motion.button
              whileTap={{
                scale: 0.97,
              }}
              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[#caf300]
                py-3
                font-bold
                uppercase
                tracking-wider
                text-black
                transition-all
                duration-500
                hover:bg-white
              "
            >
              Read More
              <FiArrowRight />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ForumPostCard;
