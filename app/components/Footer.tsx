import React from "react";

function Footer() {
  return (
    <footer className="w-full px-6 py-4 text-sm text-gray-500 flex justify-between items-center border-t border-gray-100">
      <span>© 2025 DASH - MIT License</span>
      <div className="flex gap-6">
        <a
          href="https://github.com/Chackoz/"
          className="text-gray-800 hover:text-gray-600"
        >
          Tuples - GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
