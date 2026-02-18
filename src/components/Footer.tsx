

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-20 text-gray-500 text-sm relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h4 className="text-white font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2">
                            <li className="hover:text-royal-gold cursor-pointer">Levitate</li>
                            <li className="hover:text-royal-gold cursor-pointer">Accessories</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li className="hover:text-royal-gold cursor-pointer">Support</li>
                            <li className="hover:text-royal-gold cursor-pointer">Care+</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Account</h4>
                        <ul className="space-y-2">
                            <li className="hover:text-royal-gold cursor-pointer">Manage ID</li>
                            <li className="hover:text-royal-gold cursor-pointer">Orders</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Antigravity</h4>
                        <ul className="space-y-2">
                            <li className="hover:text-royal-gold cursor-pointer">Manifesto</li>
                            <li className="hover:text-royal-gold cursor-pointer">Careers</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                    <div>&copy; 2026 Antigravity Inc. All rights reserved.</div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Sales Policy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
