export const ProductHuntButton = ({ className }: { className?: string }) => {
  return (
    <a
      href="https://www.producthunt.com/posts/leets?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-leets"
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=375438&theme=light"
        alt="Leets - The&#0032;place&#0032;to&#0032;share&#0032;and&#0032;discover&#0032;the&#0032;best&#0032;new&#0032;emerging&#0032;music | Product Hunt"
        className="h-[37.8px] w-[175px] md:h-[40.5px] md:w-[187.5px]"
      />
    </a>
  );
};
