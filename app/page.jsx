import React from "react";
import {
    Book,
    Sparkles,
    Lock,
    Calendar,
    ChevronRight,
    BarChart2,
    FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import TestimonialCarousel from "@/components/testimonialCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { getDailyPrompt } from "@/actions/dailyPrompt";
import { faqs } from "@/lib/FaqData";
const features = [
    {
        icon: Book,
        title: "Your Canvas for Thoughts",
        description:
            "Unleash your creativity with a powerful, flexible editor. From rich formatting to Markdown, shape your entries exactly as you envision them.",
    },
    {
        icon: Sparkles,
        title: "Daily Creative Sparks",
        description:
            "Never face a blank page. Our daily prompts and inspiring, mood-based imagery ignite your thoughts and keep your journaling journey vibrant.",
    },
    {
        icon: Lock,
        title: "Absolute Privacy & Security",
        description:
            "Your personal touhgts are sacred. I ensure that your data is safeguarded with enterprise-grade authentication and authorization.",
    },
];

export default async function LandingPage() {
    const dailyPrompt = await getDailyPrompt();

    return (
        <div className="relative container mx-auto pt-16 pb-16 overflow-hidden">
            {/* Gradient background for a softer feel */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-70"></div>

            {/* Hero Section */}
            <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-6xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-amber-800 py-4 to-orange-300 bg-clip-text text-transparent">
                    Your true Thoughts.<br /> Now Journaled. Organized. Maintained.
                </h1>
                <p className="text-xl md:text-2xl text-amber-700 font-semibold mx-auto opacity-90 mb-4">
                    Jot down your hearts out. Reflect your journey, your thoughts, your mind and mood.
                </p>

                {/* Journal Card - Elevated and more prominent */}
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-full mx-auto transform hover:scale-[1.01] transition-transform duration-300 ease-in-out border border-orange-100">
                    <div className="flex items-center justify-between border-b border-orange-100 pb-2">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-6 w-6 text-orange-600" />
                            <span className="text-orange-900 font-semibold text-lg">
                                Today&rsquo;s Entry
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-orange-200 animate-pulse" />
                            <div className="h-3 w-3 rounded-full bg-orange-300 animate-pulse delay-75" />
                            <div className="h-3 w-3 rounded-full bg-orange-400 animate-pulse delay-150" />
                        </div>
                    </div>
                    <div className="space-y-4 p-4">
                        <h3 className="text-2xl font-semibold text-amber-600">
                            {dailyPrompt ? dailyPrompt : "My Thoughts Today"}
                        </h3>
                        {/* Slightly varied skeleton loading for a more natural look */}
                        <Skeleton className="h-5 bg-orange-100 rounded-lg w-11/12" />
                        <Skeleton className="h-5 bg-orange-100 rounded-lg w-full" />
                        <Skeleton className="h-5 bg-orange-100 rounded-lg w-4/5" />
                    </div>
                    {/* Subtle bottom gradient to mimic depth */}
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-orange-50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* CTA Buttons - More inviting and visually distinct */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
                    <Link href="/dashboard">
                        <Button
                            variant={"journal"}
                            className="bg-gradient-to-br from-amber-700 to-amber-400 py-6 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1"
                        >
                            Start Journaling <ChevronRight className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button
                            variant="outline"
                            className="px-10 py-6 rounded-lg border border-amber-700 text-amber-700 hover:bg-orange-100 hover:text-orange-700 transition-all duration-200 ease-in-out"
                        >
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>

            ---

            {/* Feature Cards Section - Enhanced grid and card aesthetics */}
            <section id="features" className="relative z-10 mt-28 grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
                {features.map((feature, index) => (
                    <Card key={index} className="shadow-xl rounded-2xl border border-orange-100 bg-white transform hover:scale-[1.02] transition-transform duration-300 ease-in-out group">
                        <CardContent className="p-6">
                            <div className="h-14 w-14 bg-orange-100 rounded-full flex items-center justify-center mb-5 group-hover:bg-orange-200 transition-colors duration-200">
                                <feature.icon className="h-7 w-7 text-orange-600 group-hover:text-orange-700 transition-colors duration-200" />
                            </div>
                            <h3 className="font-bold text-2xl text-amber-700 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-amber-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </section>

            ---

            <div className="relative z-10 space-y-32 mt-32 px-4 sm:px-6 lg:px-8">
                {/* Feature 1: Rich Text Editor - More dynamic layout and richer preview */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                        <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center shadow-md">
                            <FileText className="h-8 w-8 text-orange-600" />
                        </div>
                        <h3 className="text-2xl lg:text-4xl font-semibold text-orange-900 leading-tight tracking-tight">
                            <b>Craft Your Story with an</b> <br /> <b>Intuitive Rich Editor.</b>
                        </h3>
                        <p className="text-xl text-orange-700 leading-relaxed max-w-lg">
                            Unleash thoughts and creativity with a <b>powerful, yet simple editor</b> for a truly delightful journaling experience.
                        </p>
                        <ul className="space-y-2 text-lg text-orange-800">
                            <li className="flex items-center gap-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-orange-400 flex-shrink-0" />
                                <span><b>Effortlessly format text</b> (bold, italics, etc.) to enhance entries.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-orange-400 flex-shrink-0" />
                                <span><b>Seamlessly embed links</b> for richer reflections.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-orange-400 flex-shrink-0" />
                                <span>Organize thoughts with <b>dynamic lists and impactful quotes.</b></span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-6 bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 animate-fade-in-up">
                        {/* Enhanced Editor Preview */}
                        <div className="flex gap-3 mb-8">
                            <Skeleton className="h-10 w-10 rounded-md bg-amber-500/60 shadow-sm animate-pulse" />
                            <Skeleton className="h-10 w-10 rounded-md bg-amber-500/60 shadow-sm animate-pulse delay-100" />
                            <Skeleton className="h-10 w-10 rounded-md bg-amber-500/60 shadow-sm animate-pulse delay-200" />
                        </div>
                        <Skeleton className="h-6 bg-amber-500/40 rounded-lg w-10/12 mb-4 animate-pulse-slow" />
                        <Skeleton className="h-6 bg-amber-500/40 rounded-lg w-full mb-4 animate-pulse-slow delay-100" />
                        <Skeleton className="h-6 bg-amber-500/40 rounded-lg w-4/5 animate-pulse-slow delay-200" />
                        <Skeleton className="h-6 bg-amber-500/40 rounded-lg w-2/3 animate-pulse-slow delay-300" />
                    </div>
                </div>

                {/* Feature 2: Mood Analytics - Reversed layout with compelling visuals */}
                <div className="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
                    <div className="space-y-8 md:order-2">
                        <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center shadow-md">
                            <BarChart2 className="h-8 w-8 text-orange-600" />
                        </div>
                        <h3 className="text-4xl font-bold text-orange-900 leading-tight">
                            Understand Your Emotional Landscape <br /> with <b>Mood Analytics.</b>
                        </h3>
                        <p className="text-xl text-orange-700 leading-relaxed">
                            Gain deeper insights into your well-being with intuitive visual analytics of your emotional journey.
                        </p>
                        <ul className="space-y-2 text-lg text-amber-600">
                            <li className="flex items-center gap-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-orange-400 flex-shrink-0" />
                                <span>Discover <b>visual mood trends</b> over time.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-orange-400 flex-shrink-0" />
                                <span>Identify <b>recurring patterns</b> and understand triggers.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-orange-400 flex-shrink-0" />
                                <span>See how your <b>mood correlates</b> with your entries.</span>
                            </li>
                        </ul>
                    </div>
                <div className="space-y-6 bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 md:order-1 animate-fade-in-up delay-300">
                    {/* More detailed Analytics Preview */}
                    <div className="h-56 bg-gradient-to-tr from-orange-100 to-orange-50 rounded-xl shadow-inner flex items-end p-4">
                        {/* Example bars for a simple chart */}
                        <div className="flex w-full justify-around h-full items-end">
                            <div className="w-8 bg-orange-300 h-2/3 rounded-t-md animate-grow-up" />
                            <div className="w-8 bg-orange-400 h-1/2 rounded-t-md animate-grow-up delay-100" />
                            <div className="w-8 bg-orange-500 h-3/4 rounded-t-md animate-grow-up delay-200" />
                            <div className="w-8 bg-orange-300 h-2/5 rounded-t-md animate-grow-up delay-300" />
                            <div className="w-8 bg-orange-400 h-4/5 rounded-t-md animate-grow-up delay-400" />
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-orange-600 font-medium px-2">
                        <span className="h-4 w-16 bg-orange-100 rounded" />
                        <span className="h-4 w-16 bg-orange-100 rounded" />
                        <span className="h-4 w-16 bg-orange-100 rounded" />
                        <span className="h-4 w-16 bg-orange-100 rounded" />
                    </div>
                </div>
            </div>
        </div>

            ---

        {/* Testimonials Carousel */ }
        < div className = "relative z-10 mt-32 px-4 sm:px-6 lg:px-8" >
            <TestimonialCarousel />
            </div >

        ---

        {/* FAQ Section - Improved styling and spacing */ }
        < div className = "relative z-10 mt-32 px-4 sm:px-6 lg:px-8" >
                <h2 className="text-4xl font-bold text-center text-orange-900 mb-16 leading-tight">
                    Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="bg-white rounded-xl shadow-md border border-orange-100 overflow-hidden"
                        >
                            <AccordionTrigger className="text-orange-900 text-xl font-semibold py-5 px-6 hover:bg-orange-50 transition-colors duration-200 [&[data-state=open]]:bg-orange-50">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-orange-700 text-lg px-6 pb-6 pt-2 leading-relaxed">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div >

        ---

        {/* Final CTA Section - More prominent and engaging */ }
        < div className = "relative z-10 mt-32 mb-16 px-4 sm:px-6 lg:px-8" >
            <Card className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl shadow-xl p-10 sm:p-12 md:p-16 text-center animate-fade-in-up delay-500">
                <CardContent className="p-0">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-orange-900 mb-8 leading-tight">
                        Start Reflecting on Your Journey Today.
                    </h2>
                    <p className="text-xl text-orange-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of individuals who are already discovering the transformative power of digital journaling with us.
                    </p>
                    <Link
                        href={"/sign-in"}>
                        <Button
                            size="lg" variant="journal" className="px-12 py-7 text-xl rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-pulse-once">
                            Get Started for Free <ChevronRight className="ml-3 h-6 w-6" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
            </div >
        </div >
    );
}