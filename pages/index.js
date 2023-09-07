import Head from "next/head";
import styles from "../styles/Home.module.css";
import Hero from "../components/Hero/Hero";
import Main from "../components/main/Main";

export default function Home() {
  return (
    <>
      <Hero />
      <Main />
    </>
  );
}
