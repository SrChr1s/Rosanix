export default function Button({
  form = false,
  text,
  noaction = false,
  onclick,
}) {
  return (
    <button
      className={`${
        form ? "w-[200px] py-2" : "px-5 py-2"
      } rounded-full bg-[#e299b6] font-[Nunito] text-white text-lg border-2 border-white hover:bg-[#E7C6FF] duration-200 active:scale-90`}
      type={`${noaction ? "button" : "submit"}`}
      onClick={onclick}
    >
      {text}
    </button>
  );
}
