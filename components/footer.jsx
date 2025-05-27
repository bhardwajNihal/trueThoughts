import { Github, Linkedin } from 'lucide-react'
import { FaXTwitter } from "react-icons/fa6";

import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full text-center flex flex-col gap-4 bg-orange-100/40 text-sm text-muted-foreground border-t-1 border-orange-400 backdrop-blur rounded-t-4xl sm:rounded-t-full py-4 container mx-auto">
        <div className="flex gap-2 sm:gap-6 justify-center items-center">
          <p>Made with ❤️ by Nihal Bhardwaj.</p>
          <a target="_blank" href="https://x.com/bhardwajnihal21" ><FaXTwitter className="hover:text-blue-400 text-lg md:text-xl"/></a>
          <a target="_blank" href="https://github.com/bhardwajNihal"><Github className="hover:text-black text-sm "/></a>
          <a target="_blank" href="https://www.linkedin.com/in/nihal-bhardwaj-8397212b8/"><Linkedin className="hover:text-blue-600 text-sm "/></a>
        </div>
        <p>© 2025 truethoughts. All rights reserved.</p>
      </footer>
  )
}

export default Footer