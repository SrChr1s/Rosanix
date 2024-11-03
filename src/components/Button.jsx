export default function Button({ text }) {
  return (
    <button className="px-5 py-2 rounded-full bg-[#C8B6FF] text-white text-xl hover:bg-[#E7C6FF] duration-200 active:scale-90">
      {text}
    </button>
  );
}
