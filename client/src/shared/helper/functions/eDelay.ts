export const eDelay = async (ms:number) => {
    return await new Promise((res,rej)=>{
        setTimeout(() => {
            res(true);
        }, ms);
    })
}

export const eDelayMin = async (startTime: number, minDelay: number): Promise<void> => {
    const elapsed = performance.now() - startTime;
    const remaining = minDelay - elapsed;
    if (remaining > 0) {
        await new Promise<void>((res) => setTimeout(res, remaining));
    }
};
