export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-16 px-6 z-20 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
        <div className="md:col-span-1">
             <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 mb-4 inline-block">
                Nano Banana
             </div>
             <p className="text-gray-400 text-sm leading-relaxed">
                 Revolutionizing the way you consume fruit. Cold-pressed, HPP treated, and delivered fresh to your door.
             </p>
        </div>

        <div>
            <h4 className="font-semibold mb-4 text-gray-200">Shop</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">All Flavors</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Variety Packs</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Subscription</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Gift Cards</a></li>
            </ul>
        </div>
        
        <div>
            <h4 className="font-semibold mb-4 text-gray-200">Support</h4>
             <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping</a></li>
                 <li><a href="#" className="hover:text-orange-500 transition-colors">Returns</a></li>
            </ul>
        </div>

         <div>
            <h4 className="font-semibold mb-4 text-gray-200">Stay Fresh</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive offers and new flavor drops.</p>
            <div className="flex gap-2">
                <input type="email" placeholder="Email address" className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-orange-500 text-white placeholder-gray-600" />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Join
                </button>
            </div>
        </div>
      </div>
      
      <div className="container mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>© {new Date().getFullYear()} Nano Banana Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-gray-400">Privacy Policy</a>
             <a href="#" className="hover:text-gray-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
