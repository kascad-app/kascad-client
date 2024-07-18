"use client";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import Login from "./login/page";

export default function Home() {
  return (
    <div>
      <Loader />
    </div>
  );
}
