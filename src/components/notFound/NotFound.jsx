import image from "../../assets/card1.png";

function NotFound() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <img
                src={image}
                alt="404 Not Found"
                className="absolute top-0 left-0 right-0 bottom-0 m-auto w-full h-full object-cover object-bottom -z-10"
            />

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-gray-800">
                    404 Not Found
                </h1>
                <p className="text-gray-600">
                    The page you are looking for does not exist.
                </p>

                <a href="/" className="text-blue-500 hover:underline">
                    Go back to the home page
                </a>
            </div>
        </div>
    );
}

export default NotFound;
