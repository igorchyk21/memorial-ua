export const createPaginatorArray = (cntPage:number, currPage:number) => {
    
    var paginator = [];

    // Кількість сторінок менша 7 - виводимо прямолінійний масив 
    if (cntPage <= 7) {
        for(let i=0;i<cntPage;i++) paginator.push(i);

    // Якщо більше ніж 7 сторінок...
    } else {
        
        // Якщо сторінка = 0 - 4 (1-5) 
        if (currPage < 4) paginator = [0,1,2,3,4,-5,cntPage-1]

        // Якщо сторінка = cntPage - 4 (тобто останні пять)
        else if (currPage >= cntPage-4) paginator = [0, -(cntPage-6), cntPage-5, cntPage-4, cntPage-3, cntPage-2, cntPage-1];

        // Всі інші випадки, коли і справа і з ліва є кнопки ...
        else paginator = [0, -(currPage-2), currPage-1, currPage, currPage+1, -(currPage+2), cntPage-1];
    }
 
    return paginator; 
} 
