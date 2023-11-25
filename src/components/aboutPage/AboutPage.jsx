import React from "react";
import style from "./about.module.scss";
import Link from "next/link";
import { BsArrowBarLeft } from "react-icons/bs";

export default function AboutPage({ post, profile }) {
  return (
    <div className={style.about}>
      <div className={style.about__item}>
        {post && post.title && (
          <p className={style.about__item__title}>{post.title}</p>
        )}
        {post && post.body && (
          <p className={style.about__item__description}>{post.body}</p>
        )}
        {profile && profile.email && (
          <p className={style.about__item__email}>
            Email: <Link href={`mailto:${profile.email}`}>{profile.email}</Link>
          </p>
        )}
        <div className={style.about__item__butback}>
          <Link href={"/"}>Назад к новостям</Link>
          <span className={style.about__item__icon}>
            <BsArrowBarLeft />
          </span>
        </div>
      </div>
    </div>
  );
}
