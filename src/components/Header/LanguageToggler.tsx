import { useTheme } from "next-themes";

const LanguegeToggler = () => {
  return (
    <button aria-label='theme toggler'
      onClick={() => {}}
      className="flex items-center justify-center text-black rounded-full cursor-pointer bg-gray-2 dark:bg-dark-bg h-9 w-9 dark:text-white md:h-14 md:w-14"
    >
      <a>VN</a>
    </button>
  );
}

export default LanguegeToggler;
