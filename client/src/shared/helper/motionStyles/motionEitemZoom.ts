export const motionEitemZoom = (index:number) => {
    return {
        initial: { opacity: 0, scale: 0.6 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, delay: index * 0.05 }
    }
}
