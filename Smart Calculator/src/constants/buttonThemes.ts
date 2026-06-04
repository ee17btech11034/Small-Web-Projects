export const BUTTON_THEMES = {
  number: {
    bgColor: "bg-zinc-100", 
    hoverBgColor: "hover:bg-zinc-200", 
    borderColor: "border-zinc-300", 
    hoverBorderColor: "hover:border-zinc-400", 
    textColor: "text-zinc-800", 
  }, 
  operation: {
    bgColor: "bg-orange-500", 
    hoverBgColor: "hover:bg-orange-400", 
    borderColor: "border-orange-700", 
    hoverBorderColor: "hover:border-orange-500", 
    textColor: "text-white", 
  }, 
  function: {
    bgColor: "bg-teal-600", 
    hoverBgColor: "hover:bg-teal-500", 
    borderColor: "border-teal-800", 
    hoverBorderColor: "hover:border-teal-600", 
    textColor: "text-white", 
  }, 
  control: {
    bgColor: "bg-zinc-400", 
    hoverBgColor: "hover:bg-zinc-300", 
    borderColor: "border-zinc-500", 
    hoverBorderColor: "hover:border-zinc-400", 
    textColor: "text-zinc-900", 
  }, 
};

// TypeScript type to ensure strict type safety
export type ButtonType = keyof typeof BUTTON_THEMES;

interface ButtonItem {
  label: string;
  variant: ButtonType; // This forces the values to be exact matches
}


export const buttonValues: ButtonItem[] = [
    {label:'(', variant:"function", }, 
    {label:')', variant:"function", }, 
    {label:'%', variant:"operation", }, 
    {label:'CLR', variant:"control", }, 
    {label:'⌫', variant:"control", }, 

    {label:'log', variant:"function", }, 
    {label:'7', variant:"number", }, 
    {label:'8', variant:"number", }, 
    {label:'9', variant:"number", }, 
    {label:'/', variant:"operation", }, 

    {label:'sqrt', variant:"function", }, 
    {label:'4', variant:"number", }, 
    {label:'5', variant:"number", }, 
    {label:'6', variant:"number", }, 
    {label:'*', variant:"operation", }, 

    {label:'pow', variant:"function", }, 
    {label:'1', variant:"number", }, 
    {label:'2', variant:"number", }, 
    {label:'3', variant:"number", }, 
    {label:'-', variant:"operation", }, 

    {label:'fact', variant:"function", }, 
    {label:'0', variant:"number", }, 
    {label:'.', variant:"number", }, 
    {label:'=', variant:"control", }, 
    {label:'+', variant:"operation", }, 
  ]