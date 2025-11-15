const Light = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[1, 1, 1]} intensity={1} />
    </>
  );
};

export default Light;
