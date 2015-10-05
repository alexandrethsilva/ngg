import DataLoader from 'dataloader';

export default function createNodeLoader({queriesLoader, nodeLabel, idFieldName}) {
  return new DataLoader(async ids => {
    const response = await queriesLoader.load({
      query: `
        MATCH (n:${nodeLabel})
        WHERE n.${idFieldName} IN {ids}
        RETURN n
      `,
      params: {ids},
    });

    const nodes = response.map(row => row.n);

    return ids.map(id => {
      return nodes.filter(node => {
        return node.properties[idFieldName] === id;
      }).shift();
    });
  });
}
