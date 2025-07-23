import { useSocialAuth } from "@/hooks/useSocialAuth";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

export default function Index() {
  const { handleSocialAuth, isLoading } = useSocialAuth();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.centerContent}>
          {/* DEMO IMAGE */}
          <View style={styles.imageWrapper}>
            <Image
              source={require("../../assets/images/auth2.png")}
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.buttonGroup}>
            {/* GOOGLE SIGNIN BTN */}
            <TouchableOpacity
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
              style={[styles.socialButton, styles.shadow]}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#4285F4" />
              ) : (
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../assets/images/google.png")}
                    style={styles.googleIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.buttonText}>Continue with Google</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* APPLE SIGNIN BTN */}
            <TouchableOpacity
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
              style={[styles.socialButton, styles.shadow]}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../assets/images/apple.png")}
                    style={styles.appleIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.buttonText}>Continue with Apple</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <Text style={styles.termsText}>
            By signing up, you agree to our{" "}
            <Text style={styles.linkText}>Terms</Text>,{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>, and{" "}
            <Text style={styles.linkText}>Cookie Use</Text>.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "space-between",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
  },
  imageWrapper: {
    alignItems: "center",
  },
  mainImage: {
    width: 384, // size-96 ~ 384px
    height: 384,
  },
  buttonGroup: {
    flexDirection: "column",
    gap: 8,
    marginTop: 24,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB", // gray-300
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  appleIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  buttonText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 16,
  },
  termsText: {
    textAlign: "center",
    color: "#6B7280", // gray-500
    fontSize: 12,
    lineHeight: 16,
    marginTop: 24,
    paddingHorizontal: 8,
  },
  linkText: {
    color: "#3B82F6", // blue-500
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
