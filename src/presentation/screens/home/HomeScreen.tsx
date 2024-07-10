import { View, Text } from "react-native";
import { useMovies } from "../../hooks/useMovies";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PosterCarousel } from "../../components/movies/PosterCarousel";
import { HorizontalCorousel } from "../../components/movies/HorizontalCarousel";
import { FullScreenLoader } from "../../components/loaders/FullScreenLoader";

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage} = useMovies();

    if (isLoading) {
        return (<FullScreenLoader />);
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 10, paddingBottom: 30 }}>
                <PosterCarousel movies={nowPlaying} />
                <HorizontalCorousel
                    movies={popular}
                    title="Populares"
                    loadingNextPage={popularNextPage}
                />
                <HorizontalCorousel
                    movies={topRated}
                    title="Mejor Calificadas"
                />
                <HorizontalCorousel movies={upcoming} title="Próximamente" />

            </View>
        </ScrollView>
    )
}
