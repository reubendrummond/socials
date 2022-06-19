import { CustomNextPage } from "@lib/types/page";
import MainLayout from "layouts/MainLayout";
import { Theme } from "@lib/types/themes";

const Themes: CustomNextPage = () => {
  const themes: Theme[] = ["theme-space", "theme-weed", "theme-sunset"];
  const changeTheme = (theme: Theme) => {
    const nextEl = window.document.querySelector("#__next");
    themes.forEach((theme) => nextEl?.classList.remove(theme));
    nextEl?.classList.add(theme);
  };

  return (
    <MainLayout>
      <div className="flex flex-col max-w-xs md:max-w-sm mx-auto gap-y-4 ">
        {themes.map((theme, index) => (
          <div
            key={theme + index}
            className={theme + " flex flex-row gap-x-4 flex-grow"}
            onClick={() => changeTheme(theme)}
          >
            <div className="flex flex-col gap-y-3">
              {["bg-primary-light", "bg-primary", "bg-primary-dark"].map(
                (col, index) => (
                  <div
                    key={col + index}
                    className={`${col} h-[40px] w-[40px] rounded-full`}
                  ></div>
                )
              )}
            </div>
            <div className="rounded-2xl p-4 bg-gradient-to-br from-primary-dark to-primary-light w-full">
              <h3 className="text-white/70">{theme}</h3>
              <p className="text-white/70">Some text</p>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

Themes.title = "Themes";

export default Themes;
