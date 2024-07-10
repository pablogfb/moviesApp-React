import { View, Text, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { Movie } from "../../../core/models/movie.model";
import { FlatList } from "react-native-gesture-handler";
import { MoviePoster } from "./MoviePoster";
import { useEffect, useRef } from "react";

interface Props {
    movies: Movie[],
    title: string,
    loadingNextPage?: () => void,
}

export const HorizontalCorousel = ({ movies, title, loadingNextPage }: Props) => {

    const isLoading = useRef(false);

    useEffect(() => {
        setTimeout(() => {
            isLoading.current = false;
        }, 200);
    }, [movies]);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

        if (isLoading.current) return;
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent

        const isEndReached = (contentOffset.x + 600 + layoutMeasurement.width) >= contentSize.width;
        if (!isEndReached) return;
        isLoading.current = true;

        loadingNextPage && loadingNextPage();
    }
    return (
        <View
            style={{ height: title ? 260 : 220 }}>
            {
                title && (<Text style={{
                    fontSize: 30,
                    fontWeight: 300,
                    marginBottom: 10,
                    marginLeft: 10
                }}>
                    {title}
                </Text>)

            }

            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <MoviePoster movie={item} width={140} height={200} />
                )}
                keyExtractor={(item, index) => `${item.id} - ${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => onScroll(event)}
            />
        </View>
    )
}
