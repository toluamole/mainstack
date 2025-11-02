import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react"

const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      outline: {
        borderRadius: "100px",
        bg: "black",
        color: "white",
        border: "1px solid black",
        _hover: {
          bg: "transparent",
          color: "black",
        },
      },
    },
  },
})

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Degular', sans-serif" },
        body: { value: "'DegularText', sans-serif" },
        mono: { value: "'Degular Mono', monospace" },
      },
      colors: {
        gray: {
          50: { value: "#EFF1F6" },
          400: { value: "#56616B" },
        },
        green: {
          500: { value: "#075132" },
        },
        red: {
          100: { value: "#F9E3E0" },
          400: { value: "#961100" },
        },
        textBlack: {
          300: { value: "#131316" },
        }
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)

