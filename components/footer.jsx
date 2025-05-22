import { FlagIcon, Github, Linkedin, LucideTwitter, Twitter, X } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full text-center flex flex-col gap-4 text-sm text-muted-foreground border-t-2 border-orange-600 backdrop-blur-xs bg-orange-100/50 rounded-t-4xl sm:rounded-t-full py-4 container mx-auto">
        <div className="flex gap-2 sm:gap-6 justify-center items-center">
          <p>Made with ❤️ by Nihal Bhardwaj.</p>
          <a target="_blank" href="https://x.com/bhardwajnihal21" ><Twitter className="hover:text-blue-400 text-sm md:text-md"/></a>
          <a target="_blank" href="https://github.com/bhardwajNihal"><Github className="hover:text-black text-sm md:text-md"/></a>
          <a target="_blank" href="https://www.linkedin.com/in/nihal-bhardwaj-8397212b8/"><Linkedin className="hover:text-blue-600 text-sm md:text-md"/></a>
        </div>
        <p>© 2025 truethoughts. All rights reserved.</p>
      </footer>
  )
}

export default Footer