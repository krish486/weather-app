import { RiSearchLine } from "@remixicon/react";

const Navbar = ({ handleCitySearch, city, setCity }) => {
    return (
        <div className="w-full px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between  gap-4">

            <h1 className="text-2xl md:text-3xl font-bold text-white text-center md:text-left">
                Weather App
            </h1>

            <div className="w-full md:w-[40%] relative">

                <RiSearchLine className="text-gray-500 absolute left-3 top-[25%] md:top-1/2 -translate-y-1/2" />

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">

                    <input
                        onChange={e => setCity(e.target.value)}
                        value={city || ''}
                        type="text"
                        placeholder="Search for the city..."
                        className="h-full w-full bg-white text-gray-800 placeholder:text-gray-500 border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={
                            () => {
                                handleCitySearch();
                            }
                        }
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Search
                    </button>

                </div>
            </div>
        </div >
    );
};

export default Navbar;