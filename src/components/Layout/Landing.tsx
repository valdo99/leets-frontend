import { Container } from "./Container";
import Image from "next/image";
import Link from "next/link";
import CCChaos from "./Chaos";

export default function LandingPage() {
  return (
    <div className="hero h-[80vh]">
      <CCChaos className=""/>
      <div className="hero-content text-center">
        <div className="max-w-md drop-shadow-2xl">
          <h1 className="text-5xl font-bold">Hunt new artists</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button className="btn btn-primary drop-shadow-[0_35px_35px_rgba(0,0,0,0.99)]">Get Started</button>
        </div>
      </div>
    </div>
  );
}