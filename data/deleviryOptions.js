export const deleviryOptions = [{
    id:'1',
    deleviryDate:7,
    priceCents:0
},{
    id:'2',
    deleviryDate:3,
    priceCents:499
},{
    id:'3',
    deleviryDate:1,
    priceCents:999
}];

export function getDeleviryOption(deleviryOptionId){
    let deleviryOption;

    deleviryOptions.forEach((option) =>{
        if (option.id === deleviryOptionId){
            deleviryOption = option
        }
    });

    return deleviryOption;
};