"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
    {
        name: "Léo Dubois",
        role: "Rider BMX – sponsorisé par TrailCore",
        image: "/assets/img/sportifs/leoDubois.png",
        text: `Kascad m’a permis de centraliser toutes mes données sportives et de les rendre accessibles aux marques. Ce que j’ai apprécié, c’est la facilité de prise de contact. Aujourd’hui je suis soutenu par un sponsor avec qui j’ai une vraie relation humaine.`,
    },
    {
        name: "Chloé Renard",
        role: "Snowboardeuse freestyle – sponsorisée par RideCo",
        image: "/assets/img/sportifs/chloe.png",
        text: `J'étais fatiguée de passer mon temps à démarcher. Grâce à Kascad, ce sont les sponsors qui viennent à moi. En quelques semaines, j’ai reçu plusieurs propositions sérieuses. C’est simple, clair, et super bien fichu.`,
    },
    {
        name: "CJ Collins",
        role: "Skateur pro – ambassadeur Flip Skateboards",
        image: "/assets/img/sportifs/cj.png",
        text: `J’ai rejoint Kascad par curiosité, mais j’ai vite été impressionné. C’est pro, fluide, et super intuitif. J’ai trouvé des opportunités que je n’aurais jamais eues seul.`,
    },
    {
        name: "Kelly Slater",
        role: "Surfeur pro – 11× champion du monde",
        image: "/assets/img/sportifs/kellySlater.png",
        text: `Kascad offre une vraie visibilité aux athlètes. J’aurais rêvé d’un outil comme ça à mes débuts. C’est une passerelle entre passion, performance et opportunité.`,
    },
];

export function TestimonialsSection() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const length = testimonials.length;

    const next = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % length);
    };

    useEffect(() => {
        const interval = setInterval(() => next(), 4000);
        return () => clearInterval(interval);
    }, []);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6 },
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            transition: { duration: 0.6 },
        }),
    };

    return (
        <section className="w-full bg-black text-white relative overflow-hidden min-h-[70vh]">
            <AnimatePresence custom={direction} mode="wait">
                <motion.div
                    key={index}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col md:flex-row w-full h-auto"
                >
                    {/* Image */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={testimonials[index].image}
                            alt={testimonials[index].name}
                            className="w-full h-full md:h-[60dvh] object-contain max-h-[40vh] md:max-h-none"
                        />
                    </div>

                    {/* Texte */}
                    <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8 md:py-0">
                        <div className="bg-black text-[#EEEEEE] p-6 md:p-10 w-full text-center shadow-lg md:rounded-xl flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                                    Ce qu’ils pensent de Kascad
                                </h2>
                                <p className="text-sm md:text-base leading-relaxed">
                                    {testimonials[index].text}
                                </p>
                                <p className="mt-4 md:mt-6 font-semibold text-[#BAFF29] text-sm md:text-base">
                                    — {testimonials[index].name}, {testimonials[index].role}
                                </p>
                            </div>

                            {/* Points */}
                            <div className="flex justify-center mt-6 gap-2">
                                {testimonials.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-2 w-2 rounded-full ${i === index ? "bg-[#BAFF29]" : "bg-gray-600"
                                            } transition-all duration-300`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>

    );
}
