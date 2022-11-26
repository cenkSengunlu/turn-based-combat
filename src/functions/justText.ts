const justText = (event: any) => {
  const re = /[a-zA-ZüğşçöıÜĞŞİÇÖI -.]/;
  if (!re.test(event.key)) {
    event.preventDefault();
  }
};

export default justText;
