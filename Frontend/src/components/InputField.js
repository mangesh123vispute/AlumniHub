export const InputField = ({
    icon,
    type = "text",
    placeholder,
    name,
    value,
    onChange,
    min,
    max,
  }) => (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
        min={min}
        max={max}
        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
        <i className={icon}></i>
      </div>
    </div>
  );
  