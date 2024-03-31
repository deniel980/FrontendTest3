"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const MainPage = () => {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState("Los Angeles");
  const [currentMap, setMap] = useState("LosAngeles");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //here we are creating animations
    const firstLocation = document.getElementById("firstLocation");
    const secondLocation = document.getElementById("secondLocation");
    const thirdLocation = document.getElementById("thirdLocation");
    const title = document.getElementById("title");
    const temperature = document.getElementById("temperature");
    const condition = document.getElementById("condition");
    const currentMap = document.getElementById("currentMap");

    if (
      firstLocation &&
      secondLocation &&
      thirdLocation &&
      title &&
      temperature &&
      condition &&
      currentMap
    ) {
      const defaultStyling = () => {
        firstLocation.style.background = "white";
        firstLocation.style.color = "black";

        elementsAppear();
      };

      const elementsAppear = () => {
        title.style.zIndex = "90";
        secondLocation.style.zIndex = "50";

        firstLocation.style.zIndex = "60";

        title.style.transition = "transform 0.5s ease-in-out";
        title.style.transform = "translateX(0)";
        const appearCities = setTimeout(() => {
          firstLocation.style.transition = "transform 0.3s ease-in-out";
          firstLocation.style.transform = "translateX(0)";

          secondLocation.style.transition = "transform 0.5s ease-in-out";
          secondLocation.style.transform = "translateX(0)";

          thirdLocation.style.transition = "transform 0.7s ease-in-out";
          thirdLocation.style.transform = "translateX(0)";
        }, 300);
        setTimeout(() => {
          title.style.zIndex = "10";
          secondLocation.style.zIndex = "40";
          firstLocation.style.zIndex = "40";
        }, 1000);
        appearLowerPart();
      };

      const appearLowerPart = () => {
        const appearInfos = setTimeout(() => {
          temperature.style.transition = "transform 0.3s ease-in-out";
          temperature.style.transform = "translateX(0)";
          setTimeout(() => {
            condition.style.transition = "transform 0.3s ease-in-out";
            condition.style.transform = "translateX(0)";
          }, 200);
        }, 900);

        const appearMap = setTimeout(() => {
          currentMap.style.transition = "transform 0.6s ease-in-out";
          currentMap.style.transform = "translateX(0)";
        }, 950);
      };

      const disappearLowerPart = () => {
        const disappearInfos = setTimeout(() => {
          temperature.style.transition = "transform 0.3s ease-in-out";
          temperature.style.transform = "translateX(-400%)";
          setTimeout(() => {
            condition.style.transition = "transform 0.3s ease-in-out";
            condition.style.transform = "translateX(-700%)";
          }, 50);
        });
        const disappearMap = setTimeout(() => {
          currentMap.style.transition = "transform 0.6s ease-in-out";
          currentMap.style.transform = "translateX(500%)";
        });
      };

      const buttonActive = (buttonName: HTMLElement) => {
        buttonName.style.background = "white";
        buttonName.style.color = "black";
      };
      const buttonInactive = (buttonName: HTMLElement) => {
        buttonName.style.background = "black";
        buttonName.style.color = "white";
      };
      firstLocation.addEventListener("click", () => {
        setCity("Los Angeles");
        setTimeout(() => {
          setMap("LosAngeles");
        }, 300);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        buttonActive(firstLocation);
        buttonInactive(secondLocation);
        buttonInactive(thirdLocation);
        disappearLowerPart();
        appearLowerPart();
      });
      secondLocation.addEventListener("click", () => {
        setCity("New Orleans");
        setTimeout(() => {
          setMap("NewOrleans");
        }, 300);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        buttonActive(secondLocation);
        buttonInactive(thirdLocation);
        buttonInactive(firstLocation);
        disappearLowerPart();
        appearLowerPart();
      });
      thirdLocation.addEventListener("click", () => {
        setCity("San Diego");
        setTimeout(() => {
          setMap("SanDiego");
        }, 300);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        buttonInactive(firstLocation);
        buttonInactive(secondLocation);
        buttonActive(thirdLocation);
        disappearLowerPart();
        appearLowerPart();
      });

      defaultStyling();
    } else {
      console.log("dependencies missing");
    }
  }, []);

  useEffect(() => {
    //here we are requesting weather
    const fetchWeather = async () => {
      try {
        const apiKey = "d0b7abc2b79441ef8e993054241303";
        const lang = "de"; // Language parameter for German
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=${lang}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Fetch initial weather data
    setTimeout(() => {
      fetchWeather();
    }, 1000);

    // Fetch weather data every 30 seconds
    const intervalId = setInterval(fetchWeather, 30000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [weather, city]);

  return (
    <div className="flex md:h-screen md:w-screen md:h-screen h-[88vh] w-screen flex-col items-center justify-between px-[3vw] py-[0vw] mx-auto overflow-hidden">
      <div className="z-10 w-full items-center justify-between font-SixCaps md:text-[8vw] text-[20vw] mx-auto">
        <div id="kindaHeader" className="md:flex gap-[10vw]">
          <div id="title" className="translate-x-[-300%]">
            CHECK YOUR WEATHER
          </div>
          <div
            id="menu"
            className="flex md:text-[4vw] text-[10vw] gap-[1vw] mt-[3vw] z-40 text-white"
          >
            <div
              id="firstLocation"
              className="translate-x-[-1000%] z-40 bg-black px-[2.5vw] md:h-[6.4vw] h-[15vw] cursor-pointer hover:scale-105 border-black hover:border-white rounded-sm"
            >
              LosAngeles
            </div>
            <div
              id="secondLocation"
              className="translate-x-[-1000%] z-40 bg-black px-[2.5vw] md:h-[6.4vw] h-[15vw] cursor-pointer hover:scale-105 border-black hover:border-white rounded-sm"
            >
              NewOrleans
            </div>
            <div
              id="thirdLocation"
              className="translate-x-[-1000%] z-40 bg-black px-[2.5vw] md:h-[6.4vw] h-[15vw] cursor-pointer hover:scale-105 border-black hover:border-white rounded-sm"
            >
              SanDiego
            </div>
          </div>
        </div>
        <div className="md:flex justify-between">
          <div
            id="bodyPart"
            className="md:flex md:gap-[4.1vw] mt-[-12vw] md:mt-0"
          >
            <div
              id="temperature"
              className="translate-x-[-400%] z-40 h-[22vw] w-[22vw] text-[52vw] md:text-[23vw]"
            >
              {weather ? (
                <div>{weather.current.temp_c}°C</div>
              ) : (
                "..."
              )}
            </div>
            <div
              id="condition"
              className="translate-x-[-700%] mt-[42vw] md:mt-[22.5vw] md:text-[4vw] text-[7vw] overflow-hidden"
            >
              {weather ? (
                <div>, &nbsp; {weather.current.condition.text}</div>
              ) : (
                "loading..."
              )}
            </div>
          </div>
          <div id="maps">
            <Image
              loading="eager"
              priority={true}
              id="currentMap"
              className="translate-x-[500%] md:w-[34vw] md:h-[25vw] w-screen h-[220px] md:mt-[3vw] mt-0 mr-[7vw]"
              width={600}
              height={500}
              src={`/maps/${currentMap}.png`}
              alt="map"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
