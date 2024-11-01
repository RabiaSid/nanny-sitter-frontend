export function H1({ className = "", children }) {
  const defaultClasses =
    "font-[400] leading-[45px] text-[35px] md:leading-[55px] md:text-[45px] lg:leading-[65px] lg:text-[55px] 2xl:leading-[75px] 2xl:text-[65px]";

  return <h1 className={`${defaultClasses} ${className}`}>{children}</h1>;
}

export function H2({ className = "", children }) {
  const defaultClasses =
    "font-[400] leading-[40px] text-[30px] md:leading-[50px] md:text-[40px] lg:leading-[60px] lg:text-[50px] 2xl:leading-[75px] 2xl:text-[65px]";

  return <h2 className={`${defaultClasses} ${className}`}>{children}</h2>;
}

export function H3({ className = "", children }) {
  const defaultClasses =
    "font-[400] leading-[30px] text-[20px] md:leading-[40px] md:text-[30px] lg:leading-[50px] lg:text-[40px] 2xl:leading-[65px] 2xl:text-[55px]";

  return <h3 className={`${defaultClasses} ${className}`}>{children}</h3>;
}

export function H4({ className = "", children }) {
  const defaultClasses =
    "font-[400] leading-[30px] text-[20px]  sm:leading-[15px] sm:text-[25px] lg:leading-[40px] lg:text-[30px] font-[500]";

  return <h4 className={`${defaultClasses} ${className}`}>{children}</h4>;
}

export function H5({ className = "", children }) {
  const defaultClasses =
    "font-[400] leading-[28px] text-[18px]  sm:leading-[30px] sm:text-[20px] lg:leading-[35px] lg:text-[25px] font-[500]";

  return <h5 className={`${defaultClasses} ${className}`}>{children}</h5>;
}

export function H6({ className = "", children }) {
  const defaultClasses =
    "font-[400]  xl:leading-[15px] xl:text-[25px] 2xl:leading-[40px] 2xl:text-[30px] font-[500]";

  return <h1 className={`${defaultClasses} ${className}`}>{children}</h1>;
}

export function Font1({ className = "", children }) {
  const defaultClasses =
    "leading-[28px] text-[18px] sm:leading-[30px] sm:text-[20px] lg:leading-[34px] lg:text-[24px] ";

  return <p className={`${defaultClasses} ${className}`}>{children}</p>;
}

export function Font2({ className = "", children }) {
  const defaultClasses =
    " font-normal leading-[24px] text-[16px] xl:leading-[26px] md:text-[18px] ";

  return <p className={`${defaultClasses} ${className}`}>{children}</p>;
}

export function Font3({ className = "", children }) {
  const defaultClasses =
    "font-normal leading-[28px] text-[18px] md:leading-[30px] md:text-[20px] font-semibold";

  return <p className={`${defaultClasses} ${className}`}>{children}</p>;
}

export function A({ className = "", children }) {
  const defaultClasses =
    "font-normal leading-[26px] text-[16px] md:leading-[28px] md:text-[18px] font-semibold";

  return <a className={`${defaultClasses} ${className}`}>{children}</a>;
}



// export function H2({ className = '', children }) {
//   const defaultClasses =
//     'font-poppins scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl';

//   return <h2 className={`${defaultClasses} ${className}`}>{children}</h2>;
// }

// export function H4({ className = '', children }) {
//   const defaultClasses =
//     'font-poppins scroll-m-20 text-[30px] font-semibold tracking-tight lg:text-[35px]';

//   return <H4 className={`${defaultClasses} ${className}`}>{children}</H4>;
// }

// export function H4({ className = '', children }) {
//   const defaultClasses =
//     'font-nohemi scroll-m-20 text-xl font-[400] tracking-wide lg:text-[33px]';

//   return <h4 className={`${defaultClasses} ${className}`}>{children}</h4>;
// }

// export function H5({ className = '', children }) {
//   const defaultClasses =
//     'font-poppins scroll-m-20 text-lg font-semibold tracking-tight lg:text-xl';

//   return <h5 className={`${defaultClasses} ${className}`}>{children}</h5>;
// }

// export function H6({ className = '', children }) {
//   const defaultClasses =
//     'font-inter scroll-m-20 text-[20px] font-semibold tracking-tight lg:text-[14px]';

//   return <h6 className={`${defaultClasses} ${className}`}>{children}</h6>;
// }

// export function P({ className = '', children }) {
//   const defaultClasses = 'font-inter leading-7 [&:not(:first-child)]:mt-6';

//   return <p className={`${defaultClasses} ${className}`}>{children}</p>;
// }

// export function Lead({ className = '', children }) {
//   const defaultClasses = 'font-poppins text-xl';

//   return <p className={`${defaultClasses} ${className}`}>{children}</p>;
// }

// export function Large({ className = '', children }) {
//   const defaultClasses = 'font-poppins text-lg font-semibold';

//   return <div className={`${defaultClasses} ${className}`}>{children}</div>;
// }

// export function Small({ className = '', children }) {
//   const defaultClasses = 'font-inter text-sm font-medium leading-none';

//   return <small className={`${defaultClasses} ${className}`}>{children}</small>;
// }

// export function Muted({ className = '', children }) {
//   const defaultClasses = 'font-inter text-muted-foreground text-sm';

//   return <p className={`${defaultClasses} ${className}`}>{children}</p>;
// }
