interface LoadMoreProps {
  onClick: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const LoadMore = ({
  onClick,
  hasNextPage,
  isFetchingNextPage,
}: LoadMoreProps) => {
  return (
    <button onClick={onClick} disabled={!hasNextPage || isFetchingNextPage}>
      {isFetchingNextPage
        ? "Loading..."
        : hasNextPage
          ? "Load more"
          : "No more"}
    </button>
  );
};
