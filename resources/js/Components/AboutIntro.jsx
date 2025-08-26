import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowRight, TrendingUp, Users, Star } from "lucide-react";
import React from "react";
import CountUp from "react-countup";
import SectionWrapper from "./SectionWrapper";

const StatsSection = () => {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                    <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-fomoPrimary-0/20 to-fomoPrimary-0/10 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-black" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                        <CountUp enableScrollSpy={true} end={120} />+
                    </div>
                    <div className="text-sm text-gray-500 font-medium">Mentees</div>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-fomoPrimary-0/20 to-fomoPrimary-0/10 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-black" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                        <CountUp enableScrollSpy={true} end={150} />+
                    </div>
                    <div className="text-sm text-gray-500 font-medium">Mentors</div>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-fomoPrimary-0/20 to-fomoPrimary-0/10 rounded-xl flex items-center justify-center">
                            <Star className="w-6 h-6 text-black" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                        <CountUp enableScrollSpy={true} end={20} />+
                    </div>
                    <div className="text-sm text-gray-500 font-medium">User Reviews</div>
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({ icon: Icon, text }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-fomoPrimary-0 to-[#ffdc6a] rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-black" />
        </div>
        <p className="text-gray-700 font-medium pt-2">{text}</p>
    </div>
);

const Intro = ({ pageProp }) => (
    <div className="grid lg:grid-cols-2 gap-16 items-center  mx-auto">
        <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-fomoPrimary-0 to-[#ffdc6a] rounded-full opacity-20 blur-xl"></div>
            <img
                src="/images/about.jpg"
                alt="Professional mentor working on laptop in modern office environment"
                className="w-full h-200 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Active Mentoring</span>
                </div>
            </div>
        </div>
        
        <div className="space-y-8">
            <div className="space-y-4">
              
                <SectionWrapper.Heading level="h1" className="text-4xl font-bold text-gray-900 leading-tight text-left">
                    Connect Learn Succeed —   The Mentors You Need
                   
                    for Every Professional Journey
                </SectionWrapper.Heading>
                
                <p className="text-normal  text-gray-700 leading-relaxed max-w-xl">
                    Access a network of skilled mentors who will guide you through
                    challenges, help set meaningful goals, and unlock new
                    opportunities to elevate your career to new heights.{" "}
                    <Link
                        className="text-fomoPrimary-0 hover:opacity-80 font-medium underline underline-offset-2 transition-opacity"
                        href={route("aboutUs")}
                    >
                        Read more..
                    </Link>
                </p>
            </div>
            
            <div className="space-y-6">
                <FeatureItem
                    icon={TrendingUp}
                    text="Share your expertise and make a lasting impact"
                />
                <FeatureItem
                    icon={Users}
                    text="Build meaningful professional relationships"
                />
                <FeatureItem
                    icon={Star}
                    text="Enhance your leadership and communication skills"
                />
            </div>
            
            <StatsSection />
            
            <div className="">
                {!pageProp?.auth?.user && (
                    <Button
                        asChild
                        className="group bg-gradient-to-r from-fomoPrimary-0 to-[#ffdc6a] hover:from-fomoPrimary-0/90 hover:to-[#ffdc6a]/90 text-black py-7 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center max-w-64 space-x-3"
                    >
                        <Link href={route("mentors.register.create")}>
                            <span>Be a Mentor</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    </div>
);

export default function AboutIntro({ pageProp }) {
    return (
        <SectionWrapper.Boxed>
            <Intro pageProp={pageProp} />
        </SectionWrapper.Boxed>
    );
}
