import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;

	@media (max-width: 1024px) {
		flex-direction: column-reverse;
	}
`;
export const LeftWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
export const Loading = styled.p``;
export const Error = styled.p`
	color: red;
`;
