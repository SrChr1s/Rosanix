export default function Button({ form = false, text }) {
  return (
    <button
      className={`${
        !form ? "px-5 py-2" : "px-20 py-2"
      } rounded-full bg-[#C8B6FF] text-white text-xl hover:bg-[#E7C6FF] duration-200 active:scale-90`}
    >
      {text}
    </button>
  );
}
