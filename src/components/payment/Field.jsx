import PropTypes from "prop-types";

const Field = ({ field, value, onChange, error }) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={field.name}
                className="block text-gray-700 font-semibold"
            >
                {field.label}:
            </label>
            <input
                type={field.type}
                name={field.name}
                value={value}
                onChange={onChange}
                id={field.name}
                placeholder={field.placeholder}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    error ? "border-red-500" : "border-gray-300"
                }`}
            />
            {error && (
                <small className="text-red-500 text-sm">{error}</small>
            )}
        </div>
    );
};

export default Field;

Field.propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};
