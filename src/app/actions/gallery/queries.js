export default {
  fetchArtworkMedia: `
    query($id: ID!) {
      artwork(id: $id) {
        id
        name
        imageRights
        onExhibit
        prettyDescription
        productionDate
        materials
        artists{
          name
        }
        artworkMaker
        uploads{
          mediaUrl
          mediaType
          openseadragonConfig
        }
      }
    }
  `,
};
