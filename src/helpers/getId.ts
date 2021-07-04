// Create ID based on the provided label
const getId = (label: string) => {
  return label.toLowerCase().replaceAll(":", "").replaceAll(" ", "_");
}

export default getId;