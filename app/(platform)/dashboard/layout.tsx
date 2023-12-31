"use client"

import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import { useAuth,useUser } from "@clerk/nextjs";
import useUserStore from "@/store/useUserStore";
import { stat } from "fs";
import { set } from "zod";
import { useEffect } from "react";
import { db } from "@/lib/db";

const DashboardLayout = ({ 
  children
}: { 
  children: React.ReactNode;
 }) => {
  const {user} = useUser();
  const store = useUserStore()
  useEffect(() => {
    if (user && user.username){
      useUserStore.setState({userId:user.username})
    }
  }, [user])

  return (
    <div>
      <Navbar />
      <div className="pt-20 md:pt-24">
        <div className="flex">
          <div className="w-52 hidden md:block">
            <Sidebar />
          </div>
          <div className="w-full h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
 };

 export default DashboardLayout;