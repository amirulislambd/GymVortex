import { FiMessageSquare, FiHeart } from "react-icons/fi";
import Link from "next/link";

const ForumPostCard = ({ post }) => {
  return (
    <div className="bg-[#0f0f0f] border border-neutral-900 flex h-48 w-full group hover:border-[#caf300]/40 transition-all">
      {/* Image Side */}
      <div className="w-1/3 h-full overflow-hidden relative">
        <div className="absolute top-2 left-2 bg-[#caf300] text-[8px] font-bold px-2 py-0.5 uppercase text-black">
          {post.category || "Featured"}
        </div>
        <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
      </div>

      {/* Content Side */}
      <div className="p-4 flex flex-col justify-between w-2/3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src={post.authorImage} className="w-6 h-6 rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-white uppercase">{post.authorName}</p>
              <p className="text-[8px] text-[#caf300] uppercase">{post.role}</p>
            </div>
          </div>
          <h3 className="text-white font-black text-sm uppercase leading-tight mb-1 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-neutral-500 text-[10px] line-clamp-2">{post.description}</p>
        </div>

        {/* Interaction Bar */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-neutral-600">
            <div className="flex items-center gap-1"><FiMessageSquare size={12} /> <span className="text-[10px]">{post.commentsCount || 0}</span></div>
            <div className="flex items-center gap-1"><FiHeart size={12} /> <span className="text-[10px]">{post.likes || 0}</span></div>
          </div>
          <Link href={`/forum/post/${post._id}`} className="bg-[#caf300] text-black text-[10px] font-bold px-3 py-1.5 uppercase hover:bg-white transition-all">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForumPostCard;