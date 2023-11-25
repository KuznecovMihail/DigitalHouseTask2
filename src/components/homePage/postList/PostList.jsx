import Link from "next/link";
import React from "react";
import style from "./postList.module.scss";
import { useRouter } from "next/navigation";

export default function PostList({ posts }) {
  const router = useRouter();
  return (
    <div className={style.posts}>
      <ul className={style.posts__list}>
        {posts.length !== 0 ? (
          posts.map((post) => (
            <li className={style.posts__item} key={post.id}>
              <Link
                onClick={() => {
                  router.push(`/${post.id}`);
                }}
                className={style.posts__title}
                href={`/${post.id}`}
              >
                {post.title}
              </Link>
              <p className={style.posts__subtitle}>{post.body}</p>
            </li>
          ))
        ) : (
          <p className={style.posts__item__null}>
            По данному запросу ничего не найдено
          </p>
        )}
      </ul>
    </div>
  );
}
