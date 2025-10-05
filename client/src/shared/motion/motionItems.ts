import { transform } from "next/dist/build/swc/generated-native"

export const motionEitem = (index:number) => {
    return {
        initial:{opacity: 0, y: 70 },
        whileInView:{ opacity: 1, y: 0 },
        viewport:{ once: true, amount: 0.2 },
        transition:{ duration: 0.8, delay: index * 0.2 },
    }
}

export const motionEitemZoom = (index:number) => {
    return {
        initial:{opacity: 0 },
        whileInView:{ opacity: 1, transform: 'scale(1)' },
        viewport:{ once: true, amount: 0.2 },
        transition:{ duration: 0.8, delay: index * 0.2 },
    }
}

export const motionEitemZoomFast = (index:number) => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    return { 
        initial:{ opacity: 0 },
        //initial:isSafari?false:{opacity: 0, transform: 'scale(0.5)' },
        whileInView:{ opacity: 1, transform: 'scale(1)' },
        viewport:{ once: true, amount: 0.2 },
        transition:{ duration: 0.5, delay: index * 0.04 },
    }
}