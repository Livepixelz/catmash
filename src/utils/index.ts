export const generateAllMatchups = (arr: any[]):any[] => {
  const pairs = []
  for (let i = 0; i < arr.length; i++) {
   for (let j = 0; j < arr.length; j++) {
     pairs.push([arr[i].id, arr[j].id])
   }
  }
  return pairs
}
