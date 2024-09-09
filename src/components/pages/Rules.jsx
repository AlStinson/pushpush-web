const Rules = () => {
  return (
    <>
      <h2 className="my-4">Rules</h2>
      <p className="mb-10 mt-5">
        Download the rules in pdf
        <span className="mobile:hidden">:</span>
        <span className="inline mobile:mt-2 mobile:block">
          <a
            target="_blank"
            href="/rules/pushpush_rules_en.pdf"
            className="ml-1.5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          >
            en
          </a>
          <a
            target="_blank"
            href="/rules/pushpush_rules_es.pdf"
            className="ml-1.5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          >
            es
          </a>
        </span>
      </p>
    </>
  );
};

export default Rules;
