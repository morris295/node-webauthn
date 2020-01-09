export class CoseCurve {

    public static getByIdentifier(id: string) {
        switch (id) {
            case "1":
                return "p256";
            case "2":
                return "p384";
            case "3":
                return "p521";
        }
    }
}
