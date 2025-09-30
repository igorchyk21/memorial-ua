export const motionEitemFade = (index:number) => {
    return {
        initial: { opacity: 0},
        animate: { opacity: 1},
        transition: { duration: 0.6, delay: index * 0.05 },
    }
}
