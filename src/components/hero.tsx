"use client";
import { motion } from "framer-motion";

export const Hero = ({ h1, p }: { h1: string; p: string }) => {
    return (
        <section className="h-[40vh] flex flex-col items-center justify-center text-center px-4">
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 mb-4"
            >
                {h1}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-gray-400 text-lg font-light tracking-wide"
            >
                {p}
            </motion.p>
        </section>
    );
};